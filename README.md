# Introduction 
TODO: Give a short introduction of your project. Let this section explain the objectives or the motivation behind this project. 

# Getting Started
TODO: Guide users through getting your code up and running on their own system. In this section you can talk about:
1.	Installation process
2.	Software dependencies
3.	Latest releases
4.	API references

# Build and Test
Follow the build instruction in the solution.



# Config 

## API Access
to use the Microsoft Graph API, e.g. for Term creation add the the snippet below.
After installing the package, grant it permissions in [Sharepoint Admin Center: Advanced / API access](https://YOUR-DOMAIN-admin.sharepoint.com/_layouts/15/online/AdminHome.aspx#/webApiPermissionManagement)

`./config/package-solution.json`
```
    "webApiPermissionRequests": [
      {
        "resource": "Microsoft Graph",
        "scope": "TermStore.ReadWrite.All"
      }
    ],
```

# Contribute
TODO: Explain how other users and developers can contribute to make your code better. 

