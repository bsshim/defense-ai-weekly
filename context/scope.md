# 국방 AI 주간 동향 수집 — 스코프 정의

## 목적
전 세계(국가·지역 무제한) 국방 AI / 자율무인체계 관련 **최근 7일** 기사를 매주 수집·정리한다.

## 수집 창
- 실행일 기준 **정확히 최근 7일** (예: 실행일이 일요일이면 지난 월요일~해당 일요일).
- 날짜가 불명확한 기사는 제외한다.
- 각 항목에 보도일자(YYYY-MM-DD)와 원문 URL을 반드시 명시한다.
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

## 산출물 3종 (파일명에 생성날짜 = `collected_at` 포함)
`<DATE>` = 실행일(KST, `YYYY-MM-DD`). 모두 `outputs/<YYYY-Www>/` 폴더 안에 저장.
1. **기사 목록** — `news_<DATE>.json` (아래 스키마) + README에 표.
2. **마크다운 브리핑** — `briefing_<DATE>.md` (분석 + 근거·출처 + 한국 안보 시사점).
3. **풀버전 HWPX 보고서** — `briefing_<DATE>.hwpx` (public-doc-to-hwpx 스킬).
4. (보조) HWPX 빌더 입력 — `values_<DATE>.json`.

## 근거·출처 명시 원칙 (필수)
- **모든 기사 항목**에 `outlet`(매체) · `date`(보도일) · `url`(원문 링크) · `evidence`(근거: 직접 인용 또는 핵심 수치)를 남긴다.
- 브리핑의 **핵심 요약·시사점 등 모든 주장**은 근거가 되는 항목 번호(`[§n]`)로 추적 가능해야 한다.
- 클라우드 환경은 `WebFetch` 외부 접속이 차단되므로 `evidence` 는 WebSearch 결과 스니펫에서 인용한다.
  원문 본문을 확인하지 못한 경우 `evidence` 끝에 `(스니펫 기준, 원문 미검증)` 을 붙인다.
- 브리핑 말미 `## 주요 출처` 의 번호는 본문 각주 번호와 일치시킨다.

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
      "outlet": "매체명",
      "date": "YYYY-MM-DD",
      "url": "https://...",
      "summary": "1~2문장",
      "evidence": "직접 인용 또는 핵심 수치 (필요 시 '(스니펫 기준, 원문 미검증)')",
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
