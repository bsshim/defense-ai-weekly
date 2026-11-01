# defense-ai-weekly

전 세계 **국방 AI / 자율무인체계** 관련 기사를 매주(일요일 09:00 KST) 자동 수집·정리하는 프로젝트.

이 repo는 동일한 파이프라인을 공유하는 두 서브 프로젝트를 담고 있다:
- **국방 AI** (본 README, repo 루트 `context/`·`scripts/`·`outputs/`)
- **[uam-aam](uam-aam/README.md)** — UAM·AAM·eVTOL 주간 동향 (repo 루트 `uam-aam/` 하위, HWPX 빌더는 `vendor/` 공유)

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
| 2026-W36 | 2026-09-05 | 08-30 ~ 09-05 | 11 | [news](outputs/2026-W36/news_2026-09-05.json) · [briefing](outputs/2026-W36/briefing_2026-09-05.md) · [hwpx](outputs/2026-W36/briefing_2026-09-05.hwpx) |
| 2026-W36 | 2026-09-06 | 08-31 ~ 09-06 | 9 | [news](outputs/2026-W36/news_2026-09-06.json) · [briefing](outputs/2026-W36/briefing_2026-09-06.md) · [hwpx](outputs/2026-W36/briefing_2026-09-06.hwpx) |
| 2026-W37 | 2026-09-13 | 09-07 ~ 09-13 | 12 | [news](outputs/2026-W37/news_2026-09-13.json) · [briefing](outputs/2026-W37/briefing_2026-09-13.md) · [hwpx](outputs/2026-W37/briefing_2026-09-13.hwpx) |
| 2026-W38 | 2026-09-20 | 09-14 ~ 09-20 | 10 | [news](outputs/2026-W38/news_2026-09-20.json) · [briefing](outputs/2026-W38/briefing_2026-09-20.md) · [hwpx](outputs/2026-W38/briefing_2026-09-20.hwpx) |
| 2026-W39 | 2026-09-27 | 09-21 ~ 09-27 | 12 | [news](outputs/2026-W39/news_2026-09-27.json) · [briefing](outputs/2026-W39/briefing_2026-09-27.md) · [hwpx](outputs/2026-W39/briefing_2026-09-27.hwpx) |
| 2026-W40 | 2026-10-04 | 09-28 ~ 10-04 | 3 | [news](outputs/2026-W40/news_2026-10-04.json) · [briefing](outputs/2026-W40/briefing_2026-10-04.md) · [hwpx](outputs/2026-W40/briefing_2026-10-04.hwpx) |
| 2026-W41 | 2026-10-11 | 10-05 ~ 10-11 | 8 | [news](outputs/2026-W41/news_2026-10-11.json) · [briefing](outputs/2026-W41/briefing_2026-10-11.md) · [hwpx](outputs/2026-W41/briefing_2026-10-11.hwpx) |
| 2026-W42 | 2026-10-18 | 10-12 ~ 10-18 | 11 | [news](outputs/2026-W42/news_2026-10-18.json) · [briefing](outputs/2026-W42/briefing_2026-10-18.md) · [hwpx](outputs/2026-W42/briefing_2026-10-18.hwpx) |
| 2026-W43 | 2026-10-25 | 10-19 ~ 10-25 | 7 | [news](outputs/2026-W43/news_2026-10-25.json) · [briefing](outputs/2026-W43/briefing_2026-10-25.md) · [hwpx](outputs/2026-W43/briefing_2026-10-25.hwpx) |
| 2026-W44 | 2026-11-01 | 10-26 ~ 11-01 | 4 | [news](outputs/2026-W44/news_2026-11-01.json) · [briefing](outputs/2026-W44/briefing_2026-11-01.md) · [hwpx](outputs/2026-W44/briefing_2026-11-01.hwpx) |
<!-- W40 브리핑: 날짜·근거 확인된 신규 기사가 예년 대비 적어 3건만 채택(목표 8~15건 미달) — 카테고리 3·4·5는 신규 보도 없음, 근접 기사는 모니터링 대상으로 이동. W39 브리핑: 항목별 근거(evidence)+출처 URL, 모든 주장에 [§n] 근거참조 적용. W41 브리핑: 美해군 X-BAT 투자·우크라이나 AI로봇포탑/AI데이터센터타격·NATO 승리이론·CSIS 중국분석·EU EDA지연보고서·GD-프리모디얼 음성AI 등 5개 카테고리 8건 채택. W42 브리핑: NATO 승리이론 3단계 공식화·헤그세스 자율무기 500억달러대 예산요청·美GAO 책임AI 이행점검·러우 전장AI드론 동시운용·우크라이나 모스크바공항 AI드론계획 미승인·인도 FWD수프림·실드AI-폴란드 X-BAT정비MOU·온다스-팔란티어 레그나AI·우크라이나-NATO JATEC 예측AI 등 5개 카테고리 11건 채택. W43 브리핑: 날짜·근거 확인된 신규 기사가 예년 대비 적어 7건 채택(목표 8~15건 미달, scope.md 쿼리 세트 전체 및 다수 보강검색 수행) — 카테고리 2·5는 신규 보도 없음 — 펜타곤 자율전쟁사령부(AUTOWARCOM) 추진공문·美GAO 책임AI 인력공백(10/3만충원) 재확인·키이우 2일간 드론타격 3건 5명사망·머스크 스타링크 속도제한 드론작전차질·불가리아 소피아 세미나 자율AI거버넌스 확산 등 3개 카테고리 채택. W44 브리핑: 날짜·근거 확인된 신규 기사가 예년 대비 더욱 적어 4건 채택(목표 8~15건 크게 미달, scope.md 쿼리 세트 전체 및 수십 건의 보강검색 수행) — 카테고리 1(미국 국방AI)·2(AI무인기 신제품)·5(기술R&D)는 신규 보도 없음 — 英RAF참모총장 "자율, 사람이 아니다" 교리전환 선언(스톰파이터 로열윙맨)·러시아 드론101기 우크라이나 야간공습(키이우 3명사망)·우크라이나 보로네시주 드론타격(2명사망, 러 113기요격주장)·하르키우 드론피격(1명사망) 등 2개 카테고리 채택 — 머스크-우크라이나 스타링크 약관공방(10/24~25)·AUTOWARCOM 지휘계획(10/30시한)·CCW LAWS 검토회의(11/16~20)·Shield AI X-BAT(10/8) 는 모니터링 대상으로 이동 -->


