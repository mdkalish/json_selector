import React from 'react';
import SocialProfile from './social_profile.js';

var SocialProfiles = React.createClass({
  getInitialState: function() {
    return {
      fullcontactData: [],
      sObjectData: []
    };
  },

  matchCounterpart: function(key, value, type) {
    var sObjectSocialMedia = this.props.sObjectData
    for (var socialMedium of sObjectSocialMedia) {
      if (socialMedium.type === type) {
        var sOValue = socialMedium[key];
      }
    }
    return sOValue;
  },

  render: function() {
    var matchCounterpart = this.matchCounterpart;
    var SocialProfileNodes = this.props.fullcontactData.map(function(socialProfile) {
    var type = socialProfile.type
      return (
        <SocialProfile
          key={'socialProfile_' + socialProfile.typeId}

          bioFc={socialProfile.bio}
          bioSo={matchCounterpart('bio', socialProfile.bio, type)}

          followersFc={socialProfile.followers}
          followersSo={matchCounterpart('followers', socialProfile.followers, type)}

          followingFc={socialProfile.following}
          followingSo={matchCounterpart('following', socialProfile.following, type)}

          idFc={socialProfile.id}
          idSo={matchCounterpart('id', socialProfile.id, type)}

          rssFc={socialProfile.rss}
          rssSo={matchCounterpart('rss', socialProfile.rss, type)}

          typeIdFc={socialProfile.typeId}
          typeIdSo={matchCounterpart('typId', socialProfile.typId, type)}

          typeNameFc={socialProfile.typeName}
          typeNameSo={matchCounterpart('typeName', socialProfile.typeName, type)}

          urlFc={socialProfile.url}
          urlSo={matchCounterpart('url', socialProfile.url, type)}

          usernameFc={socialProfile.username}
          usernameSo={matchCounterpart('username', socialProfile.username, type)}
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
