export function verificarContexto() {

    const teacherAssignmentId =
        localStorage.getItem(
            "teacher_assignment_id"
        );

    const subject =
        localStorage.getItem(
            "selected_subject"
        );

    const course =
        localStorage.getItem(
            "selected_course"
        );

    if (
        !teacherAssignmentId ||
        !subject ||
        !course
    ) {

        window.location.href =
            "/dashboard";

        return false;
    }

    return true;
}
