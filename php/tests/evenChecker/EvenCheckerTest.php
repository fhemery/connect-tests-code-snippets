<?php

namespace EvenChecker;

use CodeKatas\EvenChecker;
use PHPUnit\Framework\TestCase;

class EvenCheckerTest extends TestCase
{
    // Write tests here
    public function testShouldWork(): void
    {
        $this->assertEquals(3, 1 + 2);
    }

    private $checker;

    public function setup(): void {
        $this->checker = new EvenChecker();
    }

    public function testShouldReturnTrueFor2() {
        $this->checker->add(2);
        $this->assertTrue($this->checker->isEven());
    }

    public function testShouldReturnFalseFor7() {
        $this->checker->add(7);
        $this->assertFalse($this->checker->isEven());
    }
}
