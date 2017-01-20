class TopController < ApplicationController
  skip_before_filter :require_valid_token
end
