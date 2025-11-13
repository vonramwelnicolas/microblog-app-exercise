class Api::BlogsController < ApplicationController
  before_action :set_blog, only: %i[ show update destroy ]
  before_action :authorize_blog_owner, only: %i[ update destroy ]

  # GET /blogs
  def index
    @blogs = Blog.all.includes(:user)  # Include user data for frontend

    render json: @blogs.as_json(
      include: {
        user: {
          only: [:id, :name, :email, :created_at]
        }
      }
    )
  end

  # GET /blogs/1
  def show
    render json: @blog
  end

 # POST /blogs
 def create
  @blog = Blog.new(blog_params)
  @blog.user = current_user

  if @blog.save
    render json: @blog.as_json(
      include: {
        user: {
          only: [:id, :name, :email, :created_at]
        }
      }
    ), status: :created
  else
    render json: @blog.errors, status: :unprocessable_content
  end
end

# PATCH/PUT /blogs/1
def update
  if @blog.update(blog_params)
    render json: @blog.as_json(
      include: {
        user: {
          only: [:id, :name, :email, :created_at]
        }
      }
    )
  else
    render json: @blog.errors, status: :unprocessable_content
  end
end

  # DELETE /blogs/1
  def destroy
    @blog.destroy!
    head :no_content
  end

  private
    def set_blog
      @blog = Blog.find(params[:id])
    end

    def authorize_blog_owner
      unless @blog.user_id == current_user.id
        render json: { error: 'Not authorized to perform this action' }, status: :forbidden
      end
    end

    def blog_params
      params.require(:blog).permit(:blog_title, :content )
    end
end