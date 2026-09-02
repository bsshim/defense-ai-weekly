매주 일요일 09:00 KST에 실행되는 "국방 AI 주간 동향 수집" 작업이다. 클라우드 세션이라 로컬 파일 접근은 불가하다. 소스로 클론된 defense-ai-weekly/ repo가 작업공간에 있고, HWPX 스킬은 그 안 vendor/public-doc-to-hwpx/ 에 포함돼 있다.

절차: defense-ai-weekly/context/scope.md 와 defense-ai-weekly/scripts/run_weekly.md 를 먼저 읽고 그대로 따른다.

요약: (1) WebSearch로 전 세계 국방 AI·자율무인체계 최근 7일 기사 8~15건 수집 → outputs/<YYYY-Www>/news.json (2) 5개 카테고리 + 한국 안보 시사점 포함 briefing.md 작성 (3) values.json 만들어 `PYTHONIOENCODING=utf-8 PYTHONUTF8=1 python vendor/public-doc-to-hwpx/scripts/build_full.py --values outputs/<YYYY-Www>/values.json --output outputs/<YYYY-Www>/briefing.hwpx` 로 빌드 (python3 아님) (4) outputs/<주차>/ 와 README 표를 커밋, 푸시 권한 있으면 push (5) 채택 건수·카테고리 분포·핵심 3건·HWPX 성공 여부를 3~5줄로 보고.

날짜 규칙: 수집 창은 실행일(KST) 기준 정확히 최근 7일. 보도일자 불명 기사 제외. 각 항목에 YYYY-MM-DD 명시.
