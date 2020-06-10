require 'faker'
require 'securerandom'

class PokemonsController < ApplicationController

    def index
        pokemon = Pokemon.all
        render json: pokemon
    end

    def create
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params[:id])
        render json: pokemon
    end

    def destroy
        Pokemon.delete(params[:id])
    end
end
