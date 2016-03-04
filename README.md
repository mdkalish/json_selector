# VisualForce Pages: accessing external services, using own js libs, manipulating sObject data
### Maciej Kalisz, [mdkalish](https://github.com/mdkalish)

Initial Requirements:  
> Idea: We want to be able to quickly fetch additional information from fullcontact into Salesforce Contact object without any backend services  
> MVP / milestone: a Visualforce page that can be embed on SF Contact page that would provide a button "fetch from Fullcontact", allow to review fetched changes and accept them.  
  
Down the research process, the requirements have crystallised to persisting five specific keys from the FullContact response as diffed against the current data in our Contact sObject (SalesForce Database Object). The keys we are interested in are located in `fullcontactResponse.socialProfiles`: Facebook url, GitHub url, LinkedIn url, Twitter url, Twitter followers count.  
  
### Research:  
I divided the task into a few logical parts that would handle staged data chunks (jsons). In outline, the data chunks are:
 - Fresh FullContact response
 - FullContact response stored in sObject
 - FullContact response diffed against sObject
  
Each data chunk has to be processed with dedicated snippets as it is fed from specific input and passed to the next processing stage, which can either be automated or manual. Speaking roughly, there are three processing stages:  
  1. Fetch data from FullContact  
  2. Pick data you want to persist to sObject  
  3. Persist picked data to sObject  
  
In more detail, the processing flow triggered upon navigation to a Contact’s View is following:  
  1. Load the `socialProfiles` data onto `window` object either from sObject or Fullcontact, checking the sObject field first.  
  2. If the sObject has the Social Profiles fields empty, update them automatically with new data from Fullcontact.  
  3. If the sObject has the Social Profiles fields filled, enable diffing them against the new response from Fullcontact.  
  4. Load the diffing tool as lib from external source  
    - The tool has been written in React and built with webpack, and is served via rawgit  
  5. Render the difftool enabling the user to pick values he/she wants to persist.  
    - The diffing tool seems to be an overkill in the light of the newest requirements, but it had been built before settling the requirements. On the bright side, it should prove useful in near future, when we want to digest more of the Fullcontact json.  
  6. Update the sObject with the diffed data by passing it from the React difftool to the encapsulating VisualForce code.
  
I will expound the flow in a while.  
	
### Let’s look at the code  
#### Prerequisites  
First, create new VisualForce Page from the Setup menu. To be able to access the Contact data in the Component, we need to specify the controller with Apex:  
  
```
<apex:page standardController="Contact">
</apex:page>
```
  
This gives you the ability to *read* data from the Contact object. Three things to note here:  
  1. There’s _Preview_ button in the VisualForce Component editor. However, it’s a trap! The Component has to be embedded in an Object’s View to have it accessible as context. (In our case it’s Contact View so the context is Contact data.) _Previewing_ the Component will silently fail.  
  2. Only data visible to a user on the Contact page is accessible in the code. This means that if you want to access e.g. `Phone_Number` value, a field containing it has to be visible in the layout. If the Contact has such value but it is not displayed, you can’t access the value and the code execution will fail throwing errors at you.  
  3. We are confined in our VisualForce Component that is an iframe. `window` objects belong to the iframe and cannot be passed to neither `parent` nor `top` due to SalesForce security features. In consequence, we cannot trigger actions on nodes contained in other iframes, and communication among different Contact's Layout sections, such as Custom Buttons, Links, or VisualForce Components has to go through backend and be sequential. We are limited to the iframe the code snippet is contained within.  

You have been warned :). Now let's proceed with the necessary setup:  
1. Search "Contacts: Fields" and create six Custom Fields:  
   - `Social_Profiles__c: Long Text Area(32768)` - We need this to store json from FullContact. Unfortunately, there's no JSON field type in SalesForce (but we can workaround this). The biggest drawback is that this field has to be visible to a user too, and it's ugly. Hadn't we have to take prospective automatic scripting into account, we wouldn't need to store and render this field - we would just fetch data from FullContact on the fly.
   - `Facebook_URL__c: URL`  
   - `GitHub_URL__c: URL`  
   - `LinkedIn_URL__c: URL`  
   - `Twitter_URL__c: URL`  
   - `Twitter_Followers__c: Number`  
The `__c` suffix is appended to custom fields automatically by SalesForce.  
2. Search "Contacts: Page Layout" and embed the new Custom Fields and VisualForce Component somewhere convenient in the Contact View. Now we have opened the gate to data chunks of our interest. Let's find out how to CRUD it.
  
#### Fetch data from FullContact  
FullContact.com is a service that searches through the web for online presences. We use emails as a query. FullContact response schema includes seven keys:
```
[status, requestId, likelihood, contactInfo, demographics, photos, socialProfiles, digitalFootprint, organizations]
```
For now, we decided to focus only on the `socialProfiles` key, which is an array of [up to 100 profiles](https://www.fullcontact.com/developer/docs/#social-network-types):
```
  "socialProfiles":
  [
    {
      "typeId": {"type":"string"},
      "typeName": {"type":"string"},
      "id": {"type":"string"},
      "username": {"type":"string"},
      "url": {"type":"string"},
      "bio": {"type":"string"},
      "rss": {"type":"string"},
      "following": {"type":"number"},
      "followers": {"type":"number"}
    },
    { ...
```  

  _TODO: Now need to refactor to promises..._
## Conclusion:
  _TODO_

###Links / Literature:
  _TODO_
