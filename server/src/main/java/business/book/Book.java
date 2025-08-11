package business.book;

/*
 * TODO: Create a record constructor with fields corresponding to the fields in the
 * book table of your database.
 */

public record Book(long bookId, String title, String author, String description,
				   int price, int rating,
				   boolean isPublic, boolean isFeatured, long categoryId) {
	public Book{

	}

	public int Price() {
		return price;
	}

	public long getCategory() {
		return categoryId;
	}
}
