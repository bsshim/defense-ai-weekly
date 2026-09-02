# defense-ai-weekly

전 세계 **국방 AI / 자율무인체계** 관련 기사를 매주(일요일 09:00 KST) 자동 수집·정리하는 프로젝트.

## 구조
```
context/
  scope.md      수집 스코프·카테고리·검색 쿼리·산출물 스키마 (정본)
  Code.gs       기존 국방 AI 브리핑 웹앱 (브리핑 양식 원본)
scripts/
  run_weekly.md 클라우드 예약 에이전트 실행 플레이북
  routine_prompt.md 루틴 프롬프트 원본
vendor/
  public-doc-to-hwpx/  HWPX 빌더 스킬 (github.com/Kminer2053/public-doc-to-hwpx v3.6.11 벤더링)
outputs/
  <YYYY-Www>/                주차별 산출물 (파일명에 생성일 포함)
    news_<DATE>.json          기사 목록 (구조화, 항목별 근거·URL)
    briefing_<DATE>.md        분석·근거·출처·한국 안보 시사점 포함 마크다운 브리핑
    values_<DATE>.json        HWPX 빌더 입력
    briefing_<DATE>.hwpx      풀버전 보고서 (public-doc-to-hwpx)
```

## 자동화
- 클라우드 루틴이 매주 `context/scope.md` + `scripts/run_weekly.md` 대로 실행.
- HWPX 는 `vendor/public-doc-to-hwpx/scripts/build_full.py` 로 빌드.
- 모든 주장은 근거 항목 번호 `[§n]` 로 추적, 브리핑 말미 `## 주요 출처` 에 URL 명시.

## 수집 이력

| 주차 | 생성일 | 창 | 건수 | 산출물 |
|------|--------|-----|------|--------|
| 2026-W36 | 2026-09-02 | 08-27 ~ 09-02 | 12 | [news](outputs/2026-W36/news_2026-09-02.json) · [briefing](outputs/2026-W36/briefing_2026-09-02.md) · [hwpx](outputs/2026-W36/briefing_2026-09-02.hwpx) |
