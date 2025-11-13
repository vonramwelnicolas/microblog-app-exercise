# Clear existing data
User.destroy_all
Blog.destroy_all

# Create test users
user1 = User.create!(
  name: "Von Nicolas",
  email: "test1@example.com",
  password: "password123",
  password_confirmation: "password123"
)

user2 = User.create!(
  name: "Jane Doe",
  email: "test2@example.com",
  password: "password123",
  password_confirmation: "password123"
)

# Create sample blogs
Blog.create!(blog_title: "Blog 1", content: "Content 1", user: user1)
Blog.create!(blog_title: "Blog 2", content: "Content 2", user: user2)
Blog.create!(blog_title: "Blog 3", content: "Content 3", user: user1)

puts "✅ Seeded #{User.count} users and #{Blog.count} blogs."
