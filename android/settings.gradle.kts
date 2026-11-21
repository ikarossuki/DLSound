pluginManagement {
    repositories {
        gradlePluginPortal()
        mavenCentral()
        google()
    }
}
dependencyResolutionManagement {
    @Suppress("UnstableApiUsage")
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    @Suppress("UnstableApiUsage")
    repositories {
        val offlineReleaseRepo = file("../downloads/release-maven")
        if (offlineReleaseRepo.isDirectory) {
            exclusiveContent {
                forRepository { maven { url = offlineReleaseRepo.toURI() } }
                filter {
                    fun includeLocal(group: String, module: String, version: String) {
                        val path = group.replace('.', '/') + "/$module/$version/$module-$version.pom"
                        if (offlineReleaseRepo.resolve(path).isFile) includeVersion(group, module, version)
                    }
                    includeLocal("sh.calvin.reorderable", "reorderable-android", "3.0.0")
                    includeLocal("androidx.core", "core-ktx", "1.13.0")
                    includeLocal("androidx.emoji2", "emoji2", "1.3.0")
                    includeLocal("androidx.emoji2", "emoji2-views-helper", "1.3.0")
                    includeLocal("androidx.lifecycle", "lifecycle-process", "2.6.2")
                    includeLocal("androidx.profileinstaller", "profileinstaller", "1.3.1")
                }
            }
        }
        mavenCentral()
        google()
        maven {
            url = uri("https://jitpack.io")
        }
    }
    versionCatalogs {
        create("libsLegacy") {
            from(files("gradle/libsLegacy.versions.toml"))
        }
    }
}

rootProject.name = "DLSound"

include(":app")
include(":app:lite")
include(":app:sync")
include(":app-wear")
include(":app-wear:lite")
include(":app-wear:sync")
include(":data")
include(":data:sync")
include(":domain")
include(":domain:sync")
include(":shared:app")
include(":shared:app:lite")
include(":shared:app:sync")
include(":shared:data")
include(":shared:domain")
include(":shared:wear")
include(":common:tests")

include(":libs:fsync:core")
include(":libs:fsync:impl")
