Rails.application.routes.draw do
  namespace :api do
    get 'arbitrary', to: 'arbitrary#show'
    resources :users, only: [:create, :index]
    post 'login', to: 'auth#login'
    resources :blogs do
      member do
        patch 'update'
      end
    end
  end

  # Serve React app for all other routes (catch-all)
  get '*path', to: 'welcome#index', constraints: ->(request) { !request.path.start_with?('/api') }
  root 'welcome#index'
end