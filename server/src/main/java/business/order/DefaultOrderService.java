package business.order;

import api.ApiException;
import business.BookstoreDbException;
import business.JdbcUtils;
import business.book.Book;
import business.book.BookDao;
import business.cart.ShoppingCart;
import business.cart.ShoppingCartItem;
import business.customer.Customer;
import business.customer.CustomerDao;
import business.customer.CustomerForm;

import java.sql.Connection;
import java.sql.SQLException;
import java.time.DateTimeException;
import java.time.YearMonth;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;
import java.util.regex.Pattern;


public class DefaultOrderService implements OrderService {


    private BookDao bookDao;
    private OrderDao orderDao;
    private LineItemDao lineItemDao;
    private CustomerDao customerDao;

    public void setOrderDao(OrderDao orderDao) {
        this.orderDao = orderDao;
    }

    public void setLineItemDao(LineItemDao lineItemDao) {
        this.lineItemDao = lineItemDao;
    }

    public void setCustomerDao(CustomerDao customerDao) {
        this.customerDao = customerDao;
    }


    public void setBookDao(BookDao bookDao) {
        this.bookDao = bookDao;
    }

    @Override
    public OrderDetails getOrderDetails(long orderId) {
        Order order = orderDao.findByOrderId(orderId);
        Customer customer = customerDao.findByCustomerId(order.customerId());
        List<LineItem> lineItems = lineItemDao.findByOrderId(orderId);
        List<Book> books = lineItems
                .stream()
                .map(lineItem -> bookDao.findByBookId(lineItem.bookId()))
                .toList();
        return new OrderDetails(order, customer, lineItems, books);
    }

    @Override
    public long placeOrder(CustomerForm customerForm, ShoppingCart cart) {
        validateCustomer(customerForm);
        validateCart(cart);
        try (Connection connection = JdbcUtils.getConnection()) {
            Date ccExpDate = getCardExpirationDate(
                    customerForm.getCcExpiryMonth(),
                    customerForm.getCcExpiryYear());
            return performPlaceOrderTransaction(
                    customerForm.getName(),
                    customerForm.getAddress(),
                    customerForm.getPhone(),
                    customerForm.getEmail(),
                    customerForm.getCcNumber(),
                    ccExpDate, cart, connection);
        } catch (SQLException e) {
            throw new BookstoreDbException("Error during close connection for customer order", e);
        }
    }

    private void validateCustomer(CustomerForm customerForm) {
        String name = customerForm.getName();
        String address = customerForm.getAddress();
        String phone = customerForm.getPhone().replaceAll("[\\s-()]", "");
        String email = customerForm.getEmail();
        String ccNumber = customerForm.getCcNumber();

        if (name == null || name.isEmpty() || name.length() < 4 || name.length() > 45) {
            throw new ApiException.ValidationFailure("Invalid name field");
        }

        if (address == null || address.isEmpty() || address.length() < 4 || address.length() > 45) {
            throw new ApiException.ValidationFailure("Invalid address field");
        }

        if (phone == null || phone.isEmpty() || !phone.matches("\\d{10}")) {
            throw new ApiException.ValidationFailure("Invalid phone number");
        }

        if (email == null || email.isEmpty() || !email.matches("\\S+@\\S+\\.[^\\.\\s]+")) {
            throw new ApiException.ValidationFailure("Invalid email address");
        }
        if (!isCreditCard(ccNumber)) {
            throw new ApiException.ValidationFailure("Invalid credit card number");
        }
//		if (ccNumber == null || ccNumber.isEmpty() || !ccNumber.replaceAll("[\\s-]", "").matches("\\d{14,16}")) {
//			throw new ApiException.ValidationFailure("Invalid credit card number");
//		}

        if (expiryDateIsInvalid(customerForm.getCcExpiryMonth(), customerForm.getCcExpiryYear())) {
            throw new ApiException.ValidationFailure("Invalid expiry date");
        }
    }

    private boolean expiryDateIsInvalid(String ccExpiryMonth, String ccExpiryYear) {
        try {
            YearMonth expiryDate = YearMonth.of(Integer.parseInt(ccExpiryYear), Integer.parseInt(ccExpiryMonth));
            YearMonth currentDate = YearMonth.now();
            return expiryDate.isBefore(currentDate);
        } catch (NumberFormatException | DateTimeException e) {
            return true; // Invalid format or values
        }
    }

    private void validateCart(ShoppingCart cart) {
        if (cart.getItems().isEmpty()) {
            throw new ApiException.ValidationFailure("Cart is empty.");
        }

        cart.getItems().forEach(item -> {
            if (item.getQuantity() < 1 || item.getQuantity() > 99) {
                throw new ApiException.ValidationFailure("Invalid quantity for item " + item.getBookId());
            }
            Book databaseBook = bookDao.findByBookId(item.getBookId());
            if (databaseBook == null) {
                throw new ApiException.ValidationFailure("Book with ID " + item.getBookId() + " not found in database");
            }
            if (Math.abs(item.getPrice() - databaseBook.Price()) > 0.01) {
                throw new ApiException.ValidationFailure("Price mismatch for item " + item.getBookId());
            }
            if (item.getCategory() != databaseBook.getCategory()) {
                throw new ApiException.ValidationFailure("Category mismatch for item " + item.getBookId());
            }
        });
    }

    private static boolean isCreditCard(String str) {
        String sanitized = str.replaceAll("[- ]+", "");

        if (!Pattern.matches("\\d{14,16}", sanitized)) {
            return false;
        }

        int sum = 0;
        boolean shouldDouble = false;

        for (int i = sanitized.length() - 1; i >= 0; i--) {
            int digit = Character.getNumericValue(sanitized.charAt(i));

            if (shouldDouble) {
                digit *= 2;

                if (digit >= 10) {
                    sum += digit % 10 + 1;
                } else {
                    sum += digit;
                }
            } else {
                sum += digit;
            }

            shouldDouble = !shouldDouble;
        }

        return sum % 10 == 0;
    }

    private Date getCardExpirationDate(String monthString, String yearString) {
        int month = Integer.parseInt(monthString);
        int year = Integer.parseInt(yearString);

        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.MONTH, month - 1);
        calendar.set(Calendar.YEAR, year);

        calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));

        Date expirationDate = calendar.getTime();

        return expirationDate;
    }

    private long performPlaceOrderTransaction(
            String name, String address, String phone,
            String email, String ccNumber, Date date,
            ShoppingCart cart, Connection connection) {
        try {
            connection.setAutoCommit(false);
            java.sql.Date sqlDate = new java.sql.Date(date.getTime());
            long customerId = customerDao.create(
                    connection, name, address, phone, email,
                    ccNumber, sqlDate);
            long customerOrderId = orderDao.create(
                    connection,
                    cart.getComputedSubtotal() + cart.getSurcharge(),
                    generateConfirmationNumber(), customerId);
            for (ShoppingCartItem item : cart.getItems()) {
                lineItemDao.create(connection,
                        item.getBookId(), customerOrderId, item.getQuantity());
            }
            connection.commit();
            return customerOrderId;
        } catch (Exception e) {
            try {
                connection.rollback();
            } catch (SQLException e1) {
                throw new BookstoreDbException("Failed to roll back transaction", e1);
            }
            return 0;
        }
    }

    private int generateConfirmationNumber() {
        return ThreadLocalRandom.current().nextInt(999999999);
    }
}
