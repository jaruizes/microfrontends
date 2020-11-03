'use strict';

const { execSync } = require('child_process');

module.exports = servicebuild;

function servicebuild(archetypeArtifactId, archetypeVersion, groupId, artifactId, appName, osproject) {
    create();

    function create() {
        const archetypeGroupId = 'com.pelayo.architecture.backend';
        const packageName = groupId + "." + artifactId.replace(/\-/g, "");

        launchCommand(archetypeGroupId, archetypeArtifactId, archetypeVersion, groupId, artifactId, appName, packageName)
    }

    function launchCommand(archetypeGroupId, archetypeArtifactId, archetypeVersion, groupId, artifactId, appName, packageName) {
        osproject = osproject || '';
        console.log(`Creating service from archetype ${archetypeGroupId}:${archetypeArtifactId}:${archetypeVersion}`);
        execSync(`mvn archetype:generate -B -DarchetypeGroupId=${archetypeGroupId} -DarchetypeArtifactId=${archetypeArtifactId} -DarchetypeVersion=${archetypeVersion} -DgroupId=${groupId} -DartifactId=${artifactId} -Dpackage=${packageName} -DappName=${appName} -Dosproject=${osproject}`, {silent: true});
    }
}
