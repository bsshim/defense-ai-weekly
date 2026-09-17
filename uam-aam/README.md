# uam-aam (UAM·AAM·eVTOL 주간 동향)

전 세계 **UAM(도심항공교통)·AAM(첨단항공모빌리티)·eVTOL** 관련 기사를 매주 자동 수집·정리하는 서브 프로젝트.
`defense-ai-weekly` repo 안에서 국방 AI 프로젝트와 동일한 파이프라인·근거 원칙을 공유하며 별도 산출물 트리로 운영한다.

## 구조
```
uam-aam/
  context/
    scope.md          수집 스코프·카테고리·검색 쿼리·산출물 스키마 (정본)
  scripts/
    run_weekly.md      클라우드 예약 에이전트 실행 플레이북
    routine_prompt.md  루틴 프롬프트 원본 (루틴 미생성 상태)
  outputs/
    <YYYY-Www>/                주차별 산출물 (파일명에 생성일 포함)
      news_<DATE>.json          기사 목록 (구조화, 항목별 근거·URL)
      briefing_<DATE>.md        분석·근거·출처·한국 UAM 산업 시사점 포함 마크다운 브리핑
      values_<DATE>.json        HWPX 빌더 입력 (아직 미생성)
      briefing_<DATE>.hwpx      풀버전 보고서 (아직 미생성)
```
HWPX 빌더는 repo 루트 `vendor/public-doc-to-hwpx/` 를 국방 AI 프로젝트와 공유한다.

## 카테고리 (5분류)
1. 기체 개발·인증 2. 상용 서비스·버티포트 3. 정책·규제 4. 투자·시장 5. 기술 R&D

## 자동화
- 클라우드 루틴(`trig_01PVcaGJnSFXBkGXD9kAFTxD`)이 매주 일요일 08:00 KST에 `context/scope.md` + `scripts/run_weekly.md` 대로 실행 (국방 AI 루틴 `trig_01R7Ro5nbqss73MrW2TX8cDy` 와 별개, 같은 repo 공유이므로 커밋 전 fetch/pull 필수).
- HWPX 는 repo 루트 `vendor/public-doc-to-hwpx/scripts/build_full.py` 로 빌드.
- 모든 주장은 근거 항목 번호 `[§n]` 로 추적, 브리핑 말미 `## 주요 출처` 에 URL 명시.

## 수집 이력

| 주차 | 생성일 | 창 | 건수 | 산출물 |
|------|--------|-----|------|--------|
| 2026-W38 | 2026-09-17 | 09-11 ~ 09-17 | 8 | [news](outputs/2026-W38/news_2026-09-17.json) · [briefing](outputs/2026-W38/briefing_2026-09-17.md) · [hwpx](outputs/2026-W38/briefing_2026-09-17.hwpx) |
| 2026-W38 | 2026-09-14 | 09-08 ~ 09-14 | 7 | [news](outputs/2026-W38/news_2026-09-14.json) · [briefing](outputs/2026-W38/briefing_2026-09-14.md) · [hwpx](outputs/2026-W38/briefing_2026-09-14.hwpx) |
