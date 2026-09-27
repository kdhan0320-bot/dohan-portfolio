import { Link } from 'react-router-dom';
import ArrowForward from '@mui/icons-material/ArrowForward';
import { APPLICATION_STAGES } from '../../utils/applicationStages';
import { StageArt } from './JournalArt';

export default function StageJourney({ applications }) {
  return <nav className="stage-journey" aria-label="취업 기록의 세 단계">
    {APPLICATION_STAGES.map((stage, index) => {
      const count = applications.filter(a => stage.statuses.includes(a.status)).length;
      return <Link className={`journey-step journey-${stage.id}`} to={`/applications?stage=${stage.id}`} key={stage.id}>
        <StageArt index={index} />
        <div className="journey-copy">
          <span className="journey-number">{stage.number}</span>
          <h2>{stage.label}<span className="journey-count">{count}</span></h2>
          <p>{stage.hint}</p>
        </div>
        <ArrowForward className="journey-arrow" fontSize="small" />
      </Link>;
    })}
  </nav>;
}
