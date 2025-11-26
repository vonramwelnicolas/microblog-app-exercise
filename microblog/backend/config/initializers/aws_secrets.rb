if Rails.env.production?
  require 'aws-sdk-secretsmanager'
  
  begin
    client = Aws::SecretsManager::Client.new(region: ENV.fetch('AWS_REGION', 'ap-southeast-2'))
    secret_name = ENV.fetch('AWS_SECRET_NAME', 'von/microblog/rds-credentials')
    
    response = client.get_secret_value(secret_id: secret_name)
    secret = JSON.parse(response.secret_string)
    
    # Set environment variables from the secret
    ENV['DB_HOST'] = secret['host']
    ENV['DB_USERNAME'] = secret['username']
    ENV['DB_PASSWORD'] = secret['password']
    ENV['DATABASE_NAME'] = secret['dbname']  
    
    Rails.logger.info "Successfully loaded database credentials from AWS Secrets Manager"
  rescue => e
    Rails.logger.error "Failed to fetch secrets from AWS Secrets Manager: #{e.message}"
    Rails.logger.error e.backtrace.join("\n")
    # Fall back to environment variables if secrets manager fails
  end
end