class Api::UsersController < ApplicationController
  skip_before_action :authorize_request, only: [:create]


  def index
    @users = User.all
    render json: @users.as_json(only: [:id, :name, :email, :created_at, :updated_at])
  end

  def create
    user = User.new(user_params)
    if user.save
      token = JsonWebToken.encode(user_id: user.id)
      render json: { 
        user: user.as_json(only: [:id, :name, :email, :created_at, :updated_at]), 
        token: token 
      }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end
