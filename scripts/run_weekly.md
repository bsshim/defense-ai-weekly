# 주간 실행 플레이북 (클라우드 예약 에이전트용)

이 파일은 매주 일요일 09:00 KST에 실행되는 클라우드 루틴이 따르는 절차다.
전체 스코프는 `context/scope.md` 참조.

## 0. 준비
- 오늘 날짜(UTC/KST)와 ISO 주차(`YYYY-Www`)를 계산한다.
- 수집 창 = 최근 7일 = `[오늘-6일, 오늘]` (KST 기준).
- 작업 폴더: `outputs/<YYYY-Www>/` 를 만든다.

## 1. 수집 (WebSearch)
`context/scope.md` 의 "검색 쿼리 세트" 를 모두 실행한다. 쿼리의 연/월 토큰은 현재 날짜로 치환.
각 결과에서 **보도일자가 수집 창 안**인 기사만 채택한다. 날짜 불명은 제외.
카테고리(1~5)와 지역(국가명)을 태깅한다. 중복 URL 제거.
목표: 8~15건. 7일 창 밖이지만 중요한 후속 대상은 `excluded_out_of_window` 로 분리.

## 2. news.json 작성
`context/scope.md` 의 스키마대로 `outputs/<YYYY-Www>/news.json` 저장.

## 3. briefing.md 작성
구성(= `context/Code.gs` 브리핑 양식):
- 제목 + 기준일 + 수집 범위
- `## 핵심 요약` — 3~5개 불릿, 각 1~2문장, 두괄식
- `## 1. 미국 국방 AI 프로그램` ~ `## 5. 기술 R&D 동향` — 각 항목: **제목** (매체, 날짜) / 내용 / *시사점:*
- `## 한국 안보 시사점` — 4개 내외 불릿
- `## 주요 출처` — 번호 목록 (매체 — 제목 (날짜) · URL)
- `### 모니터링 대상 (7일 창 밖)`
`outputs/<YYYY-Www>/briefing.md` 저장.

## 4. HWPX 생성 (public-doc-to-hwpx 스킬 — repo 내 vendor)
스킬은 이 repo 안 `vendor/public-doc-to-hwpx/` 에 포함되어 있다.
1. `outputs/2026-W36/values.json` 을 템플릿 삼아 이번 주 `values.json` 을 만든다.
   - 6장 구조: Ⅰ.수집 개요 / Ⅱ.미국 국방 AI / Ⅲ.AI 무인기·자율무기 / Ⅳ.주요국 정책·규범 / Ⅴ.기술 R&D / Ⅵ.한국 안보 시사점
   - 마커 규칙: `본문_항목_001~009` 는 마커 없이 텍스트만, `본문_항목_010~012` 는 `  ◦ ` 직접 표기.
   - 목차 페이지번호는 아무 값이나 두면 빌더가 자동 계산.
2. 빌드 (repo 루트에서):
   ```bash
   PYTHONIOENCODING=utf-8 PYTHONUTF8=1 python vendor/public-doc-to-hwpx/scripts/build_full.py \
     --values outputs/<YYYY-Www>/values.json \
     --output outputs/<YYYY-Www>/briefing.hwpx
   ```
   (`python3` 아님 주의 — 환경에 따라 `python`. build_full.py 는 스킬 폴더 기준 상대경로로 템플릿을 찾으므로 `--values`/`--output` 은 절대경로 또는 위처럼 repo 루트 기준으로 준다.)
3. `[validate] 검증 통과` 로그 확인.

## 5. 커밋
- `outputs/<YYYY-Www>/` 전체와 갱신된 `README.md`(최신 주차 표) 를 커밋.
- 커밋 메시지: `weekly: <YYYY-Www> 국방 AI 동향 (<N>건)`
- 푸시 권한이 있으면 push. 없으면 세션 산출물로 남기고 그 사실을 결과 메시지에 명시.

## 6. 결과 요약
채택 건수, 카테고리별 분포, 핵심 3건, HWPX 빌드 성공 여부를 3~5줄로 보고한다.
