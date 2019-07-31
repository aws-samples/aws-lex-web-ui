# NOTE
The parent page and iframe loader that used to reside in this directory
have being moved to the [/src/website](/src/website) directory of the
repo. Please refer to its [README](/src/website/README.md).

The parent page site files (including its configuration) is copied into
this directory at build time when the site is built by CodePipepline
using the CloudFormation templates provided by this project. When
running the dev server using `npm run dev`, the site is dinamically
mounted under `/static/iframe` and it is accessible via the URL:
http://localhost:8080/static/iframe/parent.html.
