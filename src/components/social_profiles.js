import React from "react";
import SocialProfileRows from "./social_profile.js";

var SocialProfiles = React.createClass({
  componentDidMount: function() {
    window.updateJson.socialMedia = {};
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
    var onChange = this.props.onChange;
    var SocialProfileNodes = this.props.fullcontactData.map(function(socialProfile) {
      var type = socialProfile.type
      return (
        <SocialProfileRows
          onChange={onChange}
          key={"socialProfile_" + socialProfile.typeId}

          bio={[findInSObject("bio", type), socialProfile.bio]}
          followers={[findInSObject("followers", type), socialProfile.followers]}
          following={[findInSObject("following", type), socialProfile.following]}
          id={[findInSObject("id", type), socialProfile.id]}
          rss={[findInSObject("rss", type), socialProfile.rss]}
          typeName={[findInSObject("typeName", type), socialProfile.typeName]}
          url={[findInSObject("url", type), socialProfile.url]}
          username={[findInSObject("username", type), socialProfile.username]}
        />
      );
    });
    return (
      <div className="socialProfiles">
        <h2>SocialProfiles</h2>
        {SocialProfileNodes}
      </div>
    );
  }
});

module.exports = SocialProfiles;
