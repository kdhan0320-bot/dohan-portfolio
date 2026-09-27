const TYPE_INSTRUCTIONS = {
  '자기소개서': '지원 직무에 맞게 경험과 배운 점을 연결한 자기소개서 초안을 작성해주세요.',
  '면접 답변': '제공한 경험을 바탕으로 예상 질문 5개와 답변의 핵심 구조를 정리해주세요.',
  '포트폴리오 설명': '문제, 내 역할, 선택한 해결 방법, 확인한 결과의 순서로 프로젝트 설명을 정리해주세요.',
  '지원동기': '회사에 관심을 갖게 된 이유와 내 경험의 연결점을 중심으로 지원동기 초안을 작성해주세요.'
};
export const generatePrompt = (type, role, company, project, experience = '') => {
  if (!TYPE_INSTRUCTIONS[type]) return '';
  const supplied = value => value?.trim() || '[추가 확인 필요]';
  return `${TYPE_INSTRUCTIONS[type]}\n\n지원 직무: ${supplied(role)}\n지원 회사: ${supplied(company)}\n프로젝트 또는 주제: ${supplied(project)}\n실제로 한 일과 확인한 결과:\n${supplied(experience)}\n\n작성 기준\n- 위에서 제공한 사실만 사용해주세요.\n- 사용 기술, 경력, 성과 수치, 회사 특징을 임의로 만들지 마세요.\n- 정보가 부족하면 먼저 질문하거나 [추가 확인 필요]로 표시해주세요.\n- 내 기여와 팀의 성과를 구분하고 과장된 표현을 피해주세요.\n- 읽기 쉬운 짧은 문장으로 작성해주세요.`;
};
