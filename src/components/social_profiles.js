import React from 'react';
import SocialProfile from './social_profile.js';

var SocialProfiles = React.createClass({
  getInitialState: function() {
    return {
      fullcontactData: [],
      sObjectData: []
    };
  },

  findInSObject: function(key, type) {
    for (var socialMedium of this.props.sObjectData) {
      if (socialMedium.type === type) {
        var sOValue = socialMedium[key];
      }
    }
    return sOValue;
  },

  render: function() {
    var findInSObject = this.findInSObject;
    var SocialProfileNodes = this.props.fullcontactData.map(function(socialProfile) {
      var type = socialProfile.type
      return (
        <SocialProfile
          key={'socialProfile_' + socialProfile.typeId}

          bioFc={socialProfile.bio}
          bioSo={findInSObject('bio', type)}

          followersFc={socialProfile.followers}
          followersSo={findInSObject('followers', type)}

          followingFc={socialProfile.following}
          followingSo={findInSObject('following', type)}

          idFc={socialProfile.id}
          idSo={findInSObject('id', type)}

          rssFc={socialProfile.rss}
          rssSo={findInSObject('rss', type)}

          typeIdFc={socialProfile.typeId}
          typeIdSo={findInSObject('typId', type)}

          typeNameFc={socialProfile.typeName}
          typeNameSo={findInSObject('typeName', type)}

          urlFc={socialProfile.url}
          urlSo={findInSObject('url', type)}

          usernameFc={socialProfile.username}
          usernameSo={findInSObject('username', type)}
        />
      );
    });
    return (
      <div className="socialProfiles">
        <h1>SocialProfiles</h1>
        {SocialProfileNodes}
      </div>
    );
  }
});

module.exports = SocialProfiles;
