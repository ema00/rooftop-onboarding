import { EntityRepository, Repository } from "typeorm";
import Session from "../Entities/Session";


@EntityRepository(Session)
class SessionRepository extends Repository<Session> {
}

export default SessionRepository;
