//  View code story: http://nicholascbradley.com:4321/codestory/2da526b69
DefaultArtifactVersion minVersion = new DefaultArtifactVersion("1.0.1");
DefaultArtifactVersion maxVersion = new DefaultArtifactVersion("1.10");

DefaultArtifactVersion version = new DefaultArtifactVersion("1.11");

if (version.compareTo(minVersion) < 0 || version.compareTo(maxVersion) > 0) {
    System.out.println("Sorry, your version is unsupported");
}
