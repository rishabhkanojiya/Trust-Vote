from db import db
from models.vote import Candidate
from models.user import User
from flask import Blueprint, request, jsonify
from utils.error_parser import parse_error
from middlewares.auth_middleware import authenticate_request
from service.Blockchain import Blockchain
import hashlib

voter_resource = Blueprint("voter_resource", __name__)


blockchain = Blockchain()


@voter_resource.route("/user", methods=["GET"])
@authenticate_request
def get_user():
    try:
        user = User.query.get(request.user_id)
        return user.json()
    except Exception as e:
        return jsonify(parse_error(e)), 500


@voter_resource.route("/candidates", methods=["GET"])
@authenticate_request
def get_candidates():
    try:
        candidates = Candidate.query.all()
        return jsonify([candidate.json() for candidate in candidates])
    except Exception as e:
        return jsonify(parse_error(e)), 500


@voter_resource.route("/vote", methods=["POST"])
@authenticate_request
def add_vote():
    try:
        data = request.get_json()
        user = User.query.get(request.user_id)

        candidate_id = data.get("candidate_id")

        if not user.getSSN() or not candidate_id:
            return jsonify({"error": "Invalid request data"}), 400

        if blockchain.vote(
            hashlib.sha256(user.getSSN().encode()).hexdigest(), candidate_id
        ):
            return jsonify({"message": "Vote recorded successfully"}), 200
        else:
            return jsonify({"error": "You have already voted"}), 400

    except Exception as e:
        return jsonify(parse_error(e)), 500


@voter_resource.route("/vote-count/<int:candidate_id>", methods=["GET"])
@authenticate_request
def get_vote_count(candidate_id):
    try:
        vote_count = blockchain.get_candidate_vote_count(candidate_id)
        return jsonify({"vote_count": vote_count})
    except Exception as e:
        return jsonify(parse_error(e)), 500