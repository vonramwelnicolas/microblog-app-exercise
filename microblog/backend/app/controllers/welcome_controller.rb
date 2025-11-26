class WelcomeController < ApplicationController
  skip_before_action :authorize_request

  def index
    render file: Rails.public_path.join('index.html'), layout: false
  end
end