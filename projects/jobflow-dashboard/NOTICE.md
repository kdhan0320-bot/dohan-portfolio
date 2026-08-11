# JobFlow NOTICE

이 문서는 JobFlow 구직 관리 대시보드에서 현재 확인한 자산 provenance와 direct runtime dependency 정보를 추적하기 위한 안내입니다. 법률 의견이나 권리 보증서가 아닙니다.

## 중앙 자산 등록부

포트폴리오에서 사용하는 JobFlow 자산의 상세 origin·derivative·확인 상태는 다음 중앙 등록부가 Source of Truth입니다.

- [projects/my-portfolio/docs/asset-license-register.md](../my-portfolio/docs/asset-license-register.md)

이 프로젝트 수준 NOTICE는 중앙 등록부를 대체하거나 그 확인 범위를 넓히지 않습니다.

## 현재 자산 역할과 확인 범위

| 자산 | 역할 | 현재 확인 범위 |
| --- | --- | --- |
| `public/favicon.svg` | 브라우저 tab의 JobFlow favicon | 로컬 사용 역할은 확인했습니다. 중앙 등록부에는 이 파일이 고유 경로·hash로 식별되어 있지 않아 제작 경위와 권리 근거는 현재 확인할 수 없으며, 이 NOTICE는 직접 제작이라고 단정하지 않습니다. |
| `../my-portfolio/public/detail/jobflow-dashboard-1440.png` | 포트폴리오 JobFlow desktop Dashboard runtime screenshot | production guest sample read-only 화면의 browser capture로 중앙 등록부에 기록되어 있습니다. |
| `../my-portfolio/public/detail/jobflow-dashboard-390.png` | 포트폴리오 JobFlow mobile Dashboard runtime screenshot | production guest sample read-only 화면의 browser capture로 중앙 등록부에 기록되어 있습니다. |
| `../my-portfolio/public/detail/jobflow-kanban-1440.png` | 포트폴리오 전형 보드 runtime screenshot | production guest sample read-only 화면의 browser capture로 중앙 등록부에 기록되어 있습니다. |
| `../my-portfolio/public/detail/jobflow-checklist-1440.png` | 포트폴리오 체크리스트 runtime screenshot | production guest sample read-only 화면의 browser capture로 중앙 등록부에 기록되어 있습니다. |
| `../my-portfolio/public/thumbnails/normalized/jobflow-card-1600x1000.png` | 포트폴리오 Home·Projects 카드용 normalized thumbnail | 등록된 `jobflow-dashboard-1440.png`를 비율 유지해 배치한 derivative로 중앙 등록부에 기록되어 있습니다. |

현재 `projects/jobflow-dashboard`의 source·`public` 범위를 확인한 결과 외부 사진, 외부 webfont, 실제 회사 logo는 사용하지 않습니다. 글꼴은 OS system UI font stack을 사용하며, 화면 icon은 아래 `@mui/icons-material` package를 사용합니다. 이 확인은 현재 저장소 범위에 한정되며 독점성이나 법률상 무위험을 보증하지 않습니다.

## Direct runtime dependencies

아래 버전과 license 표기는 현재 `package-lock.json`의 direct runtime package entry에 기록된 `version`과 `license`를 옮긴 것입니다.

| Package | Locked version | Declared license |
| --- | ---: | --- |
| `@emotion/react` | `11.14.0` | MIT |
| `@emotion/styled` | `11.14.1` | MIT |
| `@mui/icons-material` | `9.1.1` | MIT |
| `@mui/material` | `9.1.1` | MIT |
| `@supabase/supabase-js` | `2.108.2` | MIT |
| `react` | `18.3.1` | MIT |
| `react-dom` | `18.3.1` | MIT |
| `react-router-dom` | `7.17.0` | MIT |

각 package의 사용·재배포 조건은 해당 package의 license 원문을 따릅니다. 이 표는 transitive dependency 전체 목록이 아닙니다.

## Sample data와 문서 작성 도우미

- 게스트 화면은 source에 포함된 고정 가상 sample data를 읽기 전용으로 보여줍니다. 실제 사용자·고객·회사 데이터가 아니며 로그인 사용자의 Supabase row와 병합하지 않습니다.
- `sessionStorage`에는 현재 탭의 guest mode flag만 저장되고 sample row 자체는 저장되지 않습니다.
- 사용자에게 보이는 **문서 작성 도우미**는 브라우저 안에서 local template 문자열을 만듭니다. 제품 runtime에서 외부 LLM 또는 AI API를 호출하지 않습니다.

## 프로젝트 코드 license

dependency와 자산의 license·확인 기록은 JobFlow 프로젝트 코드 자체의 복제, 수정, 배포 또는 재사용 권한을 부여하지 않습니다. 프로젝트 코드의 공개 license 정책은 이 NOTICE에서 정하지 않습니다.
