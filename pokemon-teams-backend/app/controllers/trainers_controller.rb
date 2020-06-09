class TrainersController < ApplicationController

    def index
        trainers = Trainer.all
        render json: trainers.to_json(:only => [:id, :name], :include => {:pokemon => {:only => [:id, :nickname, :species]
        }})
    end
end
