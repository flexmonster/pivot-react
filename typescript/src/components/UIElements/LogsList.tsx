type Props = {
  logsList: {
    date: Date;
    event: string;
  }[];
  title: string;
  id?: string;
};

const LogsList = (props: Props) => {
  const { logsList, title, id } = props;

  const logsTemplate = logsList.map(
    (
      logElement: {
        date: Date;
        event: string;
      },
      index: number
    ) => {
      const docRef = `https://www.flexmonster.com/api/${logElement.event}/?r=rm_react`;
      return (
        <div
          key={index}
          className='log'
        >
          <span className='log-label'>[ Event ] {logElement.date.toLocaleTimeString()}: </span>
          {logElement.event + " "}[{" "}
          <a
            className='log-link'
            rel='noopener noreferrer'
            target='_blank'
            href={docRef}
          >
            see details
          </a>{" "}
          ]
        </div>
      );
    }
  );
  return (
    <>
      <h3 className='title-4'>{title}</h3>
      <div className='event-logs-wrapper fullwidth'>
        <div className='content' id={id}>{logsTemplate}</div>
      </div>
    </>
  );
};

export default LogsList;
