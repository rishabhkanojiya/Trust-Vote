from db import db
from models.voter import Voter
from flask import Blueprint, request, jsonify
from datetime import datetime
from utils.error_parser import parse_error
from middlewares.auth_middleware import authenticate_request

voter_resource = Blueprint("voter_resource", __name__)


@voter_resource.route("/voters", methods=["GET"])
@authenticate_request
def get_voters():
    try:

        voters = Voter.query.all()
        voter_list = [voter.json() for voter in voters]
        return jsonify(voter_list), 200
    except Exception as e:
        return jsonify(parse_error(e)), 500


@voter_resource.route("/voters", methods=["POST"])
@authenticate_request
def add_voter():
    try:
        data = request.get_json()
        ssn = data.get("ssn")
        name = data.get("name")
        date_of_birth = datetime.strptime(data.get("date_of_birth"), "%Y-%m-%d").date()

        new_voter = Voter(ssn=ssn, name=name, date_of_birth=date_of_birth)
        db.session.add(new_voter)
        db.session.commit()

        return jsonify({"message": "Voter added successfully"}), 201
    except Exception as e:
        return jsonify(parse_error(e)), 500


@voter_resource.route("/voters/<int:voter_id>", methods=["GET"])
def get_voter(voter_id):
    try:
        voter = Voter.query.get(voter_id)

        if not voter:
            return jsonify({"message": "Voter not found"}), 404

        return voter.json(), 200
    except Exception as e:
        return jsonify(parse_error(e)), 500
