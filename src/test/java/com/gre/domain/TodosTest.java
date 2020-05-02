package com.gre.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.gre.web.rest.TestUtil;

public class TodosTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Todos.class);
        Todos todos1 = new Todos();
        todos1.setId(1L);
        Todos todos2 = new Todos();
        todos2.setId(todos1.getId());
        assertThat(todos1).isEqualTo(todos2);
        todos2.setId(2L);
        assertThat(todos1).isNotEqualTo(todos2);
        todos1.setId(null);
        assertThat(todos1).isNotEqualTo(todos2);
    }
}
