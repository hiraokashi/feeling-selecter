Rails.application.routes.draw do
  root to: 'top#index'
  namespace :api, { format: 'json' } do
    resource :sessions, only: [:create, :destroy, :show]
    resources :feelings
    resource :user_account do
    end
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
