Rails.application.routes.draw do
  root 'welcome#index'  # Add this line for the root route
  
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
end