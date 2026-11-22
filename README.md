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
| 2026-W45 | 2026-11-04 | 10-28 ~ 11-04 (수동 반입) | 19 | [news](outputs/2026-W45/news_2026-11-04.json) · [briefing](outputs/2026-W45/briefing_2026-11-04.md) · [hwpx](outputs/2026-W45/briefing_2026-11-04.hwpx) |
| 2026-W45 | 2026-11-08 | 11-02 ~ 11-08 | 7 | [news](outputs/2026-W45/news_2026-11-08.json) · [briefing](outputs/2026-W45/briefing_2026-11-08.md) · [hwpx](outputs/2026-W45/briefing_2026-11-08.hwpx) |
| 2026-W46 | 2026-11-15 | 11-09 ~ 11-15 | 8 | [news](outputs/2026-W46/news_2026-11-15.json) · [briefing](outputs/2026-W46/briefing_2026-11-15.md) · [hwpx](outputs/2026-W46/briefing_2026-11-15.hwpx) |
| 2026-W47 | 2026-11-22 | 11-16 ~ 11-22 | 8 | [news](outputs/2026-W47/news_2026-11-22.json) · [briefing](outputs/2026-W47/briefing_2026-11-22.md) · [hwpx](outputs/2026-W47/briefing_2026-11-22.hwpx) |
<!-- W40 브리핑: 날짜·근거 확인된 신규 기사가 예년 대비 적어 3건만 채택(목표 8~15건 미달) — 카테고리 3·4·5는 신규 보도 없음, 근접 기사는 모니터링 대상으로 이동. W39 브리핑: 항목별 근거(evidence)+출처 URL, 모든 주장에 [§n] 근거참조 적용. W41 브리핑: 美해군 X-BAT 투자·우크라이나 AI로봇포탑/AI데이터센터타격·NATO 승리이론·CSIS 중국분석·EU EDA지연보고서·GD-프리모디얼 음성AI 등 5개 카테고리 8건 채택. W42 브리핑: NATO 승리이론 3단계 공식화·헤그세스 자율무기 500억달러대 예산요청·美GAO 책임AI 이행점검·러우 전장AI드론 동시운용·우크라이나 모스크바공항 AI드론계획 미승인·인도 FWD수프림·실드AI-폴란드 X-BAT정비MOU·온다스-팔란티어 레그나AI·우크라이나-NATO JATEC 예측AI 등 5개 카테고리 11건 채택. W43 브리핑: 날짜·근거 확인된 신규 기사가 예년 대비 적어 7건 채택(목표 8~15건 미달, scope.md 쿼리 세트 전체 및 다수 보강검색 수행) — 카테고리 2·5는 신규 보도 없음 — 펜타곤 자율전쟁사령부(AUTOWARCOM) 추진공문·美GAO 책임AI 인력공백(10/3만충원) 재확인·키이우 2일간 드론타격 3건 5명사망·머스크 스타링크 속도제한 드론작전차질·불가리아 소피아 세미나 자율AI거버넌스 확산 등 3개 카테고리 채택. W44 브리핑: 날짜·근거 확인된 신규 기사가 예년 대비 더욱 적어 4건 채택(목표 8~15건 크게 미달, scope.md 쿼리 세트 전체 및 수십 건의 보강검색 수행) — 카테고리 1(미국 국방AI)·2(AI무인기 신제품)·5(기술R&D)는 신규 보도 없음 — 英RAF참모총장 "자율, 사람이 아니다" 교리전환 선언(스톰파이터 로열윙맨)·러시아 드론101기 우크라이나 야간공습(키이우 3명사망)·우크라이나 보로네시주 드론타격(2명사망, 러 113기요격주장)·하르키우 드론피격(1명사망) 등 2개 카테고리 채택 — 머스크-우크라이나 스타링크 약관공방(10/24~25)·AUTOWARCOM 지휘계획(10/30시한)·CCW LAWS 검토회의(11/16~20)·Shield AI X-BAT(10/8) 는 모니터링 대상으로 이동 W45(11-04) 브리핑: 정기 루틴 외 수동 반입 — 11/4 승인 19건(기존 원문 확인 15건 A01~A15 + 사용자 제공 자료 추가 확인 4건 B01·B03·B04·B05) 기록, 사이트 미등록 — 국방드론본부 창설·육군-카카오모빌리티 통합관제 MOU·美육군 EW 열화 시험장 개방·PC-C6 차세대C2·NATO FUSE·Euronaval 해양무인체계(엘빗 UUV·KNDS-SeaOwl USV·SIRBAI-MBDA)·GJ-21 쓰촨함 이착함·Aliaca VTOL 인증·우크라 Stargate 의무후송·中 제967병원 구호훈련·SABOTEUR·에릭슨 5G ISAC·리치파워 무선급전 등 5개 카테고리 — 원문 자동접근 실패 4건(NATO ACT·Airbus·Actusnews·mod.gov.cn)은 교차 출처로 확인. W45(11-08) 브리핑: 정기 주간 루틴(수집창 11/2~11/8) 7건 채택(목표 8~15건 다소 미달) — 카테고리 1(미국 국방AI)은 신규 보도 없음 — 한국 국방드론본부 창설(11/1~2)·영국·독일 2027 군사AI 공동개발 합의(11/2)·헬싱, 독일에 전투체계 SW 소유권 이전(11/4)·우크라이나군참모본부 10월 샤헤드/게란 드론 6,473기 발사·75%격추 발표(11/2)·러시아 하르키우 병원 피격 73명부상(11/3)·러시아 드론310기 테르노필 에너지시설 공습(11/3~4)·한국 RAM-C AI 에이전트 R&D 착수(11/4) 등 4개 카테고리 — 모스크바 드론493기 요격 주장은 날짜 혼선(10/13~14 보도와 중복 가능성) 확인되어 미채택, CCW 제7차 검토회의(11/16~20)·코난테크 국방AI서밋(11/13)·AUTOWARCOM 지휘관 인선·Modalic Chariot 11월 비행시험은 모니터링 대상으로 이동. W46(11-15) 브리핑: 정기 주간 루틴(수집창 11/9~11/15) 8건 채택(목표 8~15건 하단) — 카테고리4(주요국 정책·투자)는 미국 투자사례 1건에 그침 — Shield AI Hivemind, CCA 프로그램 최초 기록 2건 달성(F-22 지휘·CCA 편대비행 BVR 교전, 11/11 보도)·허드슨연구소 10월 요격률 84%·신형 제트드론 '게란-5 K5-K' 등장(11/11)·러시아 드론·미사일 163기 야간공습 9명사망(11/10~11)·러시아 레닌그라드주 드론146기 요격 주장(11/11)·우크라이나군 11/1~10 공격드론 87% 무력화(11/11)·러시아 제트추진 드론 키이우 주간공습(11/9)·앤듀릴 약 900억달러 밸류에이션 직원주식매각 마감·1,200억달러 신규라운드 검토(11/9)·헬싱 'Clarity' 출시(11/11) 등 5개 카테고리 채택 — CCW 제7차 검토회의(11/16~20)·AUTOWARCOM 지휘관 인선·Modalic Chariot 11월 비행시험·Saab 그리펜E 자율AI BVR시험(11/3)·북한 AI드론 가속(10/30~31)·Palantir 3분기실적(11/2)은 모니터링 대상으로 이동. W47(11-22) 브리핑: 정기 주간 루틴(수집창 11/16~11/22) 8건 채택(목표 8~15건 하단) — 카테고리1(미국 국방AI 프로그램)은 신규 보도 없음 — CCW 제7차 검토회의 폐막, 자율살상무기 구속력 조약 협상 실패·2년간 비구속 문서 마련만 합의(11/20 폐막, 보도 11/21)·러시아 '우크라이나 드론 1,300여 기 요격' 주장(11/16~17)·러시아의 우크라이나 공습 251기(11/20~21, 106+95기 요격)·美육군 173공수여단 R3NEGADE 무인차량발 자율 군집드론 18기 실사격(11/12 시연·11/16~18 보도)·한미 MANOWAR AI음향대드론망 90%대 신뢰도(11/16)·한화시스템 美리벨리온 인더스트리즈에 AESA 드론탐지레이다 첫 수출(11/18)·일본 '방위AI비전' 정책 신설, 인간의사결정권 유지 원칙(11/17)·Al Jazeera 스타쉴드 속도제한으로 우크라이나 AI드론 요격 차질(11/16) 등 4개 카테고리 채택 — AUTOWARCOM 지휘관 인선·NDAA 2027 상원표결·코난테크 '아르고-X' 12월출시·中 대만주변 훈련·NATO Drone Edge 카탈로그는 모니터링 대상으로 이동 -->

