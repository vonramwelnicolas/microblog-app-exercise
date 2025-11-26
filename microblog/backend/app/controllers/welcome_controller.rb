class WelcomeController < ApplicationController
  skip_before_action :authorize_request

  def index
    render html: <<~HTML.html_safe
      <!DOCTYPE html>
      <html>
        <head>
          <title>Rails App</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            h1 { color: #333; }
          </style>
        </head>
        <body>
          <h1>Yay! You're on Rails!</h1>
          <p>Rails version: #{Rails.version}</p>
          <p>Ruby version: #{RUBY_VERSION}</p>
        </body>
      </html>
    HTML
  end
end