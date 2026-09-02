# 국방 AI 주간 동향 수집 — 스코프 정의

## 목적
전 세계(국가·지역 무제한) 국방 AI / 자율무인체계 관련 **최근 7일** 기사를 매주 수집·정리한다.

## 수집 창
- 실행일 기준 **정확히 최근 7일** (예: 실행일이 일요일이면 지난 월요일~해당 일요일).
- 날짜가 불명확한 기사는 제외한다.
- 각 항목에 보도일자(YYYY-MM-DD)를 반드시 명시한다.
- 7일 창 밖이지만 후속 모니터링이 필요한 기사는 별도 섹션("모니터링 대상")에 분리한다.

## 카테고리 (5분류 — Code.gs 브리핑 양식 기준)
1. 미국 국방 AI 프로그램
2. AI 무인기 / 자율무기체계
3. 전장 드론 사례
4. 주요국 정책 & 투자
5. 기술 R&D 동향

## 검색 쿼리 세트 (WebSearch, 매주 반복)
- `defense AI Pentagon program announcement`
- `autonomous weapons AI drone military <이번 달/주>`
- `battlefield drone Ukraine AI targeting news`
- `military AI investment policy <연도>`
- `China military AI autonomous system <연도>`
- `Europe defense AI drone contract <이번 달>`
- `DARPA collaborative combat aircraft CCA wingman news`
- `Israel AI drone military operation autonomous`
- `국방 AI 자율무기 뉴스 <연/월>`
- (매체 직접 확인) DefenseScoop, Breaking Defense, Defense One, The Defense Post, C4ISRNET, 연합뉴스

## 산출물 3종
1. **기사 목록** — `outputs/YYYY-Www/news.json` (아래 스키마) + README에 표.
2. **마크다운 브리핑** — `outputs/YYYY-Www/briefing.md` (분석 + 한국 안보 시사점 포함).
3. **풀버전 HWPX 보고서** — `outputs/YYYY-Www/briefing.hwpx` (public-doc-to-hwpx 스킬).

## news.json 스키마
```json
{
  "briefing_id": "defense-ai-YYYY-Www",
  "collected_at": "YYYY-MM-DD",
  "window": { "from": "YYYY-MM-DD", "to": "YYYY-MM-DD" },
  "items": [
    {
      "id": 1,
      "category": 1,
      "region": "미국",
      "title": "...",
      "outlet": "...",
      "date": "YYYY-MM-DD",
      "url": "https://...",
      "summary": "1~2문장",
      "why_it_matters": "시사점 1문장"
    }
  ],
  "excluded_out_of_window": [
    { "title": "...", "outlet": "...", "date": "YYYY-MM-DD", "url": "...", "note": "..." }
  ]
}
```

## 원본 기준 자료
- `context/Code.gs` — 기존 국방 AI 브리핑 웹앱(Claude API + web_search). 브리핑 섹션 구성·날짜 규칙의 원본.
