# 119monitoring

실시간 응급실 공공데이터 API를 활용해 응급의료기관의 병상 정보를 제공하는 웹서비스입니다.
<br><br>

![image](https://github.com/119-monitoring-project/119-monitoring-web/assets/68848864/d0966727-5b9e-4d2b-9305-c84694b0111d)
<br><br><br>

## 프로젝트 소개
한 [기사](https://medigatenews.com/news/3802606837)에 따르면, 개인은 물론이고 구급대마저도 응급실에서 불필요하게 대기하고, 제때 치료를 받지 못하는 경우가 자주 발생한다고 합니다. 
<br>

또한, 해당 기사는 병상 현황을 확인하기 위해 구급대원이 일일히 병원에 전화를 돌려야하는 점을 지적하고, 전국 단위의 응급정보망 구축을 해결책으로 제시합니다.
<br>

따라서 저희 팀은 공공데이터 포털에서 제공하는 [전국 응급의료기관 정보 조회 서비스](https://www.data.go.kr/data/15000563/openapi.do)를 활용해 실시간 응급의료기관 정보 제공 웹서비스를 구현했습니다.
<br><br>

### 기대효과
- 구급대원에게 실시간 병상 정보를 제공해 환자 이송 시간 단축 및 응급실 뺑뺑이 현상 방지 가능
- 일반인들에게 응급실 가용 병상 정보를 제공해 특정 병원에만 환자가 몰리는 현상 해소 가능
- 시각화 차트를 통해 실시간 또는 시간대별로 각 병원의 응급실 변화율을 확인 가능
<br><br><br>

## 기술 스택
- Django(DRF)
- React.js
- AWS(EC2, RDS)
- Docker
- Github Actions
<br><br><br>

## 디렉토리 구조
```
├── backend
│   ├── Dockerfile.backend
│   ├── configs
│   ├── hospital_api
│   ├── manage.py
│   ├── poetry.lock
│   └── pyproject.toml

├── frontend
│   ├── Dockerfile.frontend
│   ├── node_modules
│   ├── package.json
│   ├── public
│   └── src
│       ├── App.css
│       ├── App.js
│       ├── App.test.js
│       ├── components
│       ├── icons
│       ├── index.css
│       ├── index.js
│       ├── logo.svg
│       ├── reportWebVitals.js
│       └── setupTests.js
```
해당 Repo 내에 frontend와 backend 폴더를 모두 구현했으며, 독립적으로 배포하기 위해 Dockerfile을 각각 작성했습니다.
<br><br><br>

## 아키텍처
![image](https://github.com/119-monitoring-project/119-monitoring-web/assets/68848864/b50af1fd-7989-43b0-9ed1-a7f225ee792f)
공공데이터 포털에서 제공하는 API 중 응급의료기관 목록정보, 응급의료기관 기본정보, 외상센터 목록정보, 외상센터 기본정보 API는 각 기관의 ID, 주소, 대표전화, 진료 요일, 진료과목 등의 정보를 제공합니다. 이와 같은 데이터는 자주 변경되지 않는다고 판단해, Airflow를 사용해 24시간 주기로 RDS에 업데이트했습니다.
<br><br>

실시간 가용병상조회 API는 Kafka를 사용해 S3에 업데이트하며, 해당 과정이 실패할 경우 Slack으로 에러 메시지가 전송됩니다.
S3에 저장된 실시간 데이터는 실시간성을 보장하기 위해 Airflow를 사용해 1분 주기로 Redshift에 업데이트했습니다.
<br><br>

웹에서는 RDS에 저장된 목록, 기본, 실시간 정보를 사용해 사용자에게 병상 정보를 제공합니다.
<br><br><br>

## 주요 기능
해당 프로젝트는 인덱스, 목록, 지도 3개의 페이지로 구성되었습니다.
<br><br>

### 인덱스 페이지
![image](https://github.com/119-monitoring-project/119-monitoring-web/assets/68848864/d0966727-5b9e-4d2b-9305-c84694b0111d)
- 시작하기 버튼 클릭 시 목록 페이지로 이동
- 헤더의 목록, 지도 버튼 클릭 시 각 페이지로 이동
<br><br>

### 목록 페이지
![image](https://github.com/119-monitoring-project/119-monitoring-web/assets/68848864/7509d608-1a36-4730-954c-b4ca4644508d)
- 병원 이름으로 검색 및 상세/실시간 병상 정보로 필터링 가능
- "실시간 정보 동기화" 버튼 클릭 시 페이지 새로고침되며 실시간 병상 정보 동기화
- "상세정보 보기", "실시간 정보 보기" 버튼 클릭 시 해당 병원의 상세/실시간 병상 정보 출력
- "지도에서 보기" 버튼 클릭 시 지도 페이지에서 해당 병원 위치 확인 가능
<br><br>

### 지도 페이지
![image](https://github.com/119-monitoring-project/119-monitoring-web/assets/68848864/5d3a902c-6dea-48b7-8109-3a3573df09e1)
- 카카오맵 API를 활용해 전국 522개 응급의료시설의 위치를 마커로 표시
- 특정 마커 클릭 시 해당 병원의 기본 정보를 오버레이로 출력
<br><br>

### 시연 영상
https://github.com/119-monitoring-project/data-pipeline/assets/103482118/5c4c183f-e280-4508-b8ab-7e5f139f1d2f

<br><br><br>

## 기타
[노선 페이지](https://dev-wonjin-lee.notion.site)의 프로젝트 란에서 기여점, 기능 상세 설명, 시각화 차트, 회고 내용 등을 확인할 수 있습니다.
<br><br>
[블로그](https://velog.io/@ian_lee/?q=119monitoring)에서 프로젝트의 개발일지를 확인할 수 있습니다.
