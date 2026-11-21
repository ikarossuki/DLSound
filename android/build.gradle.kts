import org.jetbrains.kotlin.gradle.dsl.JvmTarget
import org.jetbrains.kotlin.gradle.dsl.KotlinVersion
import org.jetbrains.kotlin.gradle.tasks.KotlinCompile
import org.jetbrains.kotlin.gradle.tasks.KotlinCompilationTask

plugins {
    alias(libs.plugins.androidApplication) apply false
    alias(libs.plugins.kapt) apply false
    alias(libs.plugins.kotlinCompose) apply false
    alias(libs.plugins.androidJunit5) apply false
}

allprojects {
    configurations.all {
        // Lint must inspect the Android libraries (including their bundled lint.jar).
        if (name.endsWith("ReleaseLintChecksClasspath")) {
            attributes.attribute(org.jetbrains.kotlin.gradle.plugin.KotlinPlatformType.attribute,
                org.jetbrains.kotlin.gradle.plugin.KotlinPlatformType.androidJvm)
        }
        // fix for test running
        resolutionStrategy.force("org.objenesis:objenesis:2.6")
        // HimitsuPlayer: processors also inspect annotations in the installed Kotlin 2.4 stdlib.
        // This is a build-time transitive dependency covered by D002, not an app runtime feature.
        if (name.startsWith("kapt") || name.contains("AnnotationProcessor", ignoreCase = true)) {
            resolutionStrategy.force("org.jetbrains.kotlin:kotlin-metadata-jvm:2.4.10")
        }
    }
}

tasks.register<Delete>("clean") {
    delete(rootProject.layout.buildDirectory)
}

allprojects {
    tasks.withType<KotlinCompilationTask<*>>().configureEach {
        compilerOptions {
            // HimitsuPlayer: the existing Room/Dagger processors support metadata through 2.3.
            // Reuse the installed compiler while preserving the upstream language level.
            languageVersion.set(KotlinVersion.KOTLIN_2_3)
            apiVersion.set(KotlinVersion.KOTLIN_2_3)
            freeCompilerArgs.addAll(
                "-Xno-call-assertions",
                "-Xno-receiver-assertions",
                "-Xno-param-assertions",
                "-Xopt-in=kotlinx.coroutines.ExperimentalCoroutinesApi"
            )
        }
    }
}

subprojects {
    tasks.withType<KotlinCompile>().configureEach {
        compilerOptions {
            jvmTarget.set(JvmTarget.fromTarget(Constants.JAVA_VERSION.toString()))
        }
    }

    if (!file("build.gradle.kts").exists() && !file("build.gradle").exists()) {
        tasks.register<Delete>("clean") {
            delete(layout.buildDirectory)
        }
    }
}
