class Api::ArbitraryController < ApplicationController
  skip_before_action :authorize_request

  def show
    render json: { message: "This is an arbitrary JSON response", timestamp: Time.current, data: { foo: "bar", number: 42 } }
  end
end