### Create a user pool flow

The following images display the flow of configuration screens after selecting 
create new user pool from the AWS Cognito User Pools console. The changes and selections are
identified by the red arrows. These settings will support
use of the new User Pool by the lex-web-ui. 

![](./readmeimages/userpoolstep1.png)
![](./readmeimages/userpoolstep2.png)
![](./readmeimages/userpoolstep3.png)
![](./readmeimages/userpoolstep4.png)
![](./readmeimages/userpoolstep5a.png)
![](./readmeimages/userpoolstep5b.png)
![](./readmeimages/userpoolstep6.png)
![](./readmeimages/userpoolstep7.png)
![](./readmeimages/userpoolstep8.png)
![](./readmeimages/userpoolstep8a.png)
![](./readmeimages/userpoolstep8b.png)
![](./readmeimages/userpoolstep9.png)
![](./readmeimages/userpoolstep10.png)
![](./readmeimages/userpoolcreatecomplete.png)

### User Pool App Client Settings

Once the user pool has been created, the pool's app client settings also need to be configured.

![](./readmeimages/userpoolappclientsettings.png)

### User Pool App Domain Name

An app domain name for the User Pool also needs to be specified.

![](./readmeimages/userpoolappdomainname.png)

### Identity Pool Authentication Provider

Finally the Identity Pool needs to be configured to utilize the new Cognito User Pool as
the authentication provider.

![](./readmeimages/identitypoolauthenticationproviders.png)
