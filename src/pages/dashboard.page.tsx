import * as React from 'react';
import NibCidOfficersDashboard from '../components/nib-cid-officers-dashboard.component';
import ProgramOfficerDashboard from '../components/program-officer-dashboard.component';
import StudentsDashboard from '../components/students-dashboard.component';

export interface IAppProps {
}

export interface IAppState {
}

export default class Dashboard extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    this.state = {
    }
  }
  public render() {
    return (
      <div>
        <NibCidOfficersDashboard/>
      </div>
    );
  }
}
