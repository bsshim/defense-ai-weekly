# GitHub 푸시 안내

이 repo 는 로컬에서 `git init` + 최초 커밋까지 완료된 상태다.
아래 중 하나로 GitHub 에 올리면 된다.

## 방법 A — gh CLI (설치되어 있다면)
```bash
cd C:/Users/kai/skill/defense-ai-weekly
gh repo create defense-ai-weekly --private --source=. --remote=origin --push
```

## 방법 B — 웹에서 빈 repo 생성 후 푸시
1. https://github.com/new 에서 `defense-ai-weekly` 생성 (README 등 체크 해제, 빈 상태로).
2. 아래 실행 (`<USER>` 를 본인 계정으로):
```bash
cd C:/Users/kai/skill/defense-ai-weekly
git remote add origin https://github.com/<USER>/defense-ai-weekly.git
git push -u origin main
```

## 푸시 후
- repo URL 을 알려주면 클라우드 예약 루틴의 소스로 연결한다.
- **비공개(private) repo** 로 만들면, 클라우드 루틴이 클론하려면 해당 환경에 GitHub 연결이 필요하다.
  공개(public) 로 하면 바로 클론 가능. (민감 정보 없음 — 공개 무방)
- 루틴이 outputs 를 **커밋 푸시**하려면 환경에 쓰기 권한 GitHub 연결이 필요하다.
  없으면 산출물은 각 실행 세션(claude.ai/code)에서 다운로드.
