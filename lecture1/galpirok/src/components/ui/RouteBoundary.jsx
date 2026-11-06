import { Component } from 'react';
import { Button } from '@mui/material';

export default class RouteBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() { return { failed: true }; }

  componentDidUpdate(previousProps) {
    if (previousProps.resetKey !== this.props.resetKey && this.state.failed) {
      this.setState({ failed: false });
    }
  }

  render() {
    if (this.state.failed) return <main className="route-load-state" role="alert">
      <h1>화면을 불러오지 못했어요</h1>
      <p>연결 상태를 확인한 후 다시 시도해주세요.</p>
      <p>다시 불러오면 샘플 변경과 저장하지 않은 입력이 초기화될 수 있어요.</p>
      <Button variant="contained" onClick={() => window.dispatchEvent(new Event('galpirok:reload'))}>다시 불러오기</Button>
    </main>;
    return this.props.children;
  }
}
