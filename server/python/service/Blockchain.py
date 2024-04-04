import hashlib
import time


class Block:
    def __init__(self, index, votes, previous_hash):
        self.index = index
        self.votes = votes
        self.previous_hash = previous_hash
        self.timestamp = int(time.time())
        self.hash = self.calculate_hash()

    def calculate_hash(self):
        vote_data = "".join([str(vote) for vote in self.votes])
        sha = hashlib.sha256()
        sha.update(
            (
                str(self.index)
                + vote_data
                + str(self.previous_hash)
                + str(self.timestamp)
            ).encode("utf-8")
        )
        return sha.hexdigest()


class Blockchain:
    def __init__(self):
        self.chain = []
        self.create_genesis_block()

    def create_genesis_block(self):
        genesis_block = Block(0, [], "0")
        self.chain.append(genesis_block)

    def get_latest_block(self):
        return self.chain[-1]

    def vote(self, voter_ssn, candidate_id):
        vote = (voter_ssn, candidate_id)

        voter_has_voted = any(
            vote == existing_vote
            for block in self.chain
            for existing_vote in block.votes
        )

        if voter_has_voted:
            return False

        previous_block = self.get_latest_block()
        new_index = previous_block.index + 1
        new_votes = previous_block.votes + [vote]
        new_block = Block(new_index, new_votes, previous_block.hash)
        self.chain.append(new_block)
        return True

    def is_chain_valid(self):
        for i in range(1, len(self.chain)):
            current_block = self.chain[i]
            previous_block = self.chain[i - 1]

            if current_block.hash != current_block.calculate_hash():
                return False

            if current_block.previous_hash != previous_block.hash:
                return False

        return True

    def get_candidate_vote_count(self, candidate_id):
        vote_count = 0
        for block in self.chain:
            print("block : ", block.votes)
            for vote in block.votes:
                print("vote : ", vote)
                ssn, voted_candidate_id = vote
                if voted_candidate_id == candidate_id:
                    vote_count += 1
        return vote_count


# # Example usage
# with app.app_context():
#     db.create_all()

# blockchain = Blockchain()

# # Add candidates
# candidate1 = Candidate(name="Candidate 1", description="Description for Candidate 1")
# candidate2 = Candidate(name="Candidate 2", description="Description for Candidate 2")
# db.session.add(candidate1)
# db.session.add(candidate2)
# db.session.commit()

# # Cast votes
# blockchain.vote("123456789", "John Doe", "1990-05-15", candidate1.id)
# blockchain.vote("987654321", "Jane Smith", "1985-10-22", candidate2.id)

# # Try to vote again (should fail)
# blockchain.vote("123456789", "John Doe", "1990-05-15", candidate2.id)

# # Get vote counts
# candidate1_vote_count = blockchain.get_candidate_vote_count(candidate1.id)
# candidate2_vote_count = blockchain.get_candidate_vote_count(candidate2.id)

# print(f"Votes for {candidate1.name}: {candidate1_vote_count}")
# print(f"Votes for {candidate2.name}: {candidate2_vote_count}")