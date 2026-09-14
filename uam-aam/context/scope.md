# UAM·AAM·eVTOL 주간 동향 수집 — 스코프 정의

## 목적
전 세계(국가·지역 무제한) **UAM(도심항공교통)·AAM(첨단항공모빌리티)·eVTOL** 관련 **최근 7일** 기사를 매주 수집·정리한다.
`defense-ai-weekly` repo의 국방 AI 프로젝트와 동일한 파이프라인·근거 원칙을 공유하되, 별도 산출물 트리(`uam-aam/`)로 운영한다.

## 수집 창
- 실행일 기준 **정확히 최근 7일** (예: 실행일이 월요일이면 지난 화요일~해당 월요일).
- 날짜가 불명확한 기사는 제외한다.
- 각 항목에 보도일자(YYYY-MM-DD)와 원문 URL을 반드시 명시한다.
- 7일 창 밖이지만 후속 모니터링이 필요한 기사는 별도 섹션("모니터링 대상")에 분리한다.

## 카테고리 (5분류)
1. 기체 개발·인증 — eVTOL 기체 개발(신형기·시제기·시험비행)과 FAA/EASA/국토부 등 형식/운항 인증
2. 상용 서비스·버티포트 — UAM/AAM 실증·상용 운항, 노선, 버티포트 인프라
3. 정책·규제 — 국가별 UAM/AAM 로드맵, 법제도, 저고도 공역 관리
4. 투자·시장 — 펀딩, M&A, 상장, 시장 전망·수요 예측
5. 기술 R&D — 배터리·전력계통, 자율비행/항법, 소음저감, 인프라 기술

## 검색 쿼리 세트 (WebSearch, 매주 반복)
- `eVTOL certification FAA EASA news <연도>`
- `urban air mobility UAM commercial launch vertiport`
- `advanced air mobility AAM policy regulation government <연도>`
- `eVTOL funding investment Series raise <이번 달>`
- `Joby Archer Beta Lilium EHang Volocopter Vertical Aerospace Wisk Supernal news`
- `China low-altitude economy eVTOL drone news`
- `eVTOL battery autonomous flight noise reduction technology`
- `도심항공교통 UAM 상용화 뉴스 <연/월>`
- `K-UAM 그랜드챌린지 실증 뉴스`
- (매체 직접 확인) Aviation Week, FlightGlobal, eVTOL.com, The Air Current, 연합뉴스, 국토교통부 보도자료

## 산출물 (파일명에 생성날짜 = `collected_at` 포함)
`<DATE>` = 실행일(KST, `YYYY-MM-DD`). 모두 `uam-aam/outputs/<YYYY-Www>/` 폴더 안에 저장.
1. **기사 목록** — `news_<DATE>.json` (아래 스키마) + README에 표.
2. **마크다운 브리핑** — `briefing_<DATE>.md` (분석 + 근거·출처 + 한국 UAM 산업 시사점).
3. **풀버전 HWPX 보고서** — `briefing_<DATE>.hwpx` (repo 루트 `vendor/public-doc-to-hwpx` 스킬 재사용, 국방 AI 프로젝트와 공유).
4. (보조) HWPX 빌더 입력 — `values_<DATE>.json`.

## 근거·출처 명시 원칙 (필수, 국방 AI 프로젝트와 동일)
- **모든 기사 항목**에 `outlet`(매체) · `date`(보도일) · `url`(원문 링크) · `evidence`(근거: 직접 인용 또는 핵심 수치)를 남긴다.
- 브리핑의 **핵심 요약·시사점 등 모든 주장**은 근거가 되는 항목 번호(`[§n]`)로 추적 가능해야 한다.
- 클라우드 환경은 `WebFetch` 외부 접속이 차단되므로 `evidence` 는 WebSearch 결과 스니펫에서 인용한다.
  원문 본문을 확인하지 못한 경우 `evidence` 끝에 `(스니펫 기준, 원문 미검증)` 을 붙인다.
- 브리핑 말미 `## 주요 출처` 의 번호는 본문 각주 번호와 일치시킨다.

## news.json 스키마
```json
{
  "briefing_id": "uam-aam-YYYY-Www",
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

## 공유 자산
- HWPX 빌더: repo 루트 `vendor/public-doc-to-hwpx/` (국방 AI 프로젝트와 공유, 별도 벤더링 불필요).
- 실행 절차: `uam-aam/scripts/run_weekly.md` (국방 AI `scripts/run_weekly.md` 구조를 따름).
