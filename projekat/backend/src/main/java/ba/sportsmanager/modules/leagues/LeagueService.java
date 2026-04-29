package ba.sportsmanager.modules.leagues;

import ba.sportsmanager.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeagueService {

    private final LeagueRepository leagueRepository;

    public LeagueService(LeagueRepository leagueRepository) {
        this.leagueRepository = leagueRepository;
    }

    public List<LeagueResponse> getAll() {
        return leagueRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    public LeagueResponse create(CreateLeagueRequest request) {
        LeagueEntity league = new LeagueEntity();
        league.setLeagueName(request.leagueName());
        league.setSeason(request.season());
        league.setStatus(LeagueStatus.ACTIVE);

        return toResponse(leagueRepository.save(league));
    }

    public LeagueEntity getEntity(Long id) {
        return leagueRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("League not found."));
    }

    private LeagueResponse toResponse(LeagueEntity league) {
        return new LeagueResponse(
                league.getId(),
                league.getLeagueName(),
                league.getSeason(),
                league.getStatus()
        );
    }
}