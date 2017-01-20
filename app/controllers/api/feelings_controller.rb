class Api::FeelingsController < ApplicationController
 
  skip_before_filter :require_valid_token
  def index
    @feelings = Feeling.all
  end
end
