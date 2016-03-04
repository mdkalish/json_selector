var initialLoader =
  (function () {
    function createSalesForceContact() {
      var contact = new sforce.SObject("Contact");
      contact.Id = '{!Contact.Id}';
      return contact;
    }

    function getCustomFields() {
      return {
        facebook_url: '{!Contact.Facebook_URL__c}',
        github_url: '{!Contact.GitHub_URL__c}',
        linkedin_url: '{!Contact.LinkedIn_URL__c}',
        twitter_url: '{!Contact.Twitter_URL__c}',
        twitter_followers: '{!Contact.Twitter_Followers__c}'
      };
    }

    function persistSocialProfiles(contact, socialProfiles) {
      return new Promise(function(resolve, reject) {
        contact.Social_Profiles__c = socialProfiles;
        result = sforce.connection.update([contact]);
        if (result[0].getBoolean("success")) {
          resolve(JSON.parse(socialProfiles));
        } else {
          reject(result);
        };
      });
    }

    function parseInsideNode(socialProfiles) {
      var socialProfilesNode = document.createElement("div");
      socialProfilesNode.style.display = "none";
      socialProfilesNode.innerHTML = socialProfiles;
      var socialProfilesJson = JSON.parse(socialProfilesNode.innerHTML);
      socialProfilesNode.remove();
      return socialProfilesJson;
    }

    function retrieveSocialProfilesFromSobject() {
      var remoteObjectModel = new RemoteObjectModel.Contact();
      return new Promise(function(resolve, reject) {
        remoteObjectModel.retrieve({where: {Id: {eq: '{!Contact.Id}'}}}, function(err, res, e) {
          resolve(res[0].get("Social_Profiles__c"));
        });
      })
    }

    function getFullcontactUrl() {
      var host = "https://api.fullcontact.com"
      var endpoint = "/v2/person.json"
      var query = "?email={!Contact.Email}&"
      var apiKey = "apiKey=YourApiKey"
      var url = host + endpoint + query + apiKey;
      return url;
    }

    function loadSocialProfiles() {
      return new Promise(function(resolve, reject) {
        retrieveSocialProfilesFromSobject().then(function(socialProfiles) {
          if (socialProfiles) {
            resolve(parseInsideNode(socialProfiles));
          } else {
            fetch(getFullcontactUrl()).then(function(response) {
              return response.json()
            }).then(function(json) {
              return persistSocialProfiles(
                createSalesForceContact(),
                JSON.stringify(json.socialProfiles)
              );
            }).then(function(socialProfiles) {
              resolve(socialProfiles);
            });
          }
        });
      });
    }

    // Update sObject Part

    function assignToCustomFields(contact, customFields, socialProfiles) {
      var assignedAny = false;
      for (var cf in customFields) {
        if (!customFields[cf]) {
          var name = cf.split('_')[0];
          var refinement = cf.split('_')[1];
          var cfValue = socialProfiles.map(function(sp) {
            if (sp.typeName.toLowerCase() === name && sp[refinement]) {
              assignedAny = true;
              return sp[refinement];
            }
          });
          contact[cf + '__c'] = cfValue;
        }
      };
      return assignedAny;
    }

    function updateSobject(contact) {
      var result = sforce.connection.update([contact]);
      if (result[0].getBoolean("success")) {
        alert("Successfully updated Custom Social Profiles, please reload the page to see results.")
      } else {
        alert("Error, please report to dev support: " + result);
      };
    }

    function updateCustomFields(socialProfiles) {
      contact = createSalesForceContact();
      var customFields = getCustomFields();
      var assignedAny = assignToCustomFields(contact, customFields, socialProfiles);
      if (assignedAny) { updateSobject(contact) };
    }

    /// Update sObject Part

    if (typeof loadSocialProfiles === "function") {
      loadSocialProfiles().then(function(socialProfiles) {
        updateCustomFields(socialProfiles);
      });
    }
  });